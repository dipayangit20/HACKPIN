import express from "express";
import multer from "multer";
import fetch from "node-fetch";
import Twilio from "twilio";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();
const app = express();
const upload = multer();
const port = process.env.PORT || 3000;

const tw = Twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

// Ensure folders exist
if (!fs.existsSync("./uploads")) fs.mkdirSync("./uploads");
if (!fs.existsSync("./public")) fs.mkdirSync("./public");

// Reverse geocode coordinates
async function reverseGeocode(lat, lon){
  if(!process.env.GOOGLE_MAPS_KEY) return null;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${process.env.GOOGLE_MAPS_KEY}`;
  const r = await fetch(url);
  const j = await r.json();
  return j.results?.[0]?.formatted_address || null;
}

// Nearby hospitals & police stations
async function nearbyPlaces(lat, lon){
  if(!process.env.GOOGLE_MAPS_KEY) return [];
  const types = ["hospital","police"];
  const results = [];
  for(const type of types){
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=5000&type=${type}&key=${process.env.GOOGLE_MAPS_KEY}`;
    const r = await fetch(url);
    const j = await r.json();
    j.results?.slice(0,5).forEach(p=>{
      results.push({name:p.name, type, address:p.vicinity, location:p.geometry.location});
    });
  }
  return results;
}

// Placeholder scene description
async function describeScene(imageBuffer){
  return "Two injured people on a muddy village road, one bleeding from head.";
}

// LLM call for alert
async function produceAlert(scene, lat, lon, address){
  const prompt = `You are an emergency assistant.
Scene: "${scene}"
Return JSON:
{
 "alert":"<=120 chars with ${lat},${lon} or ${address}",
 "firstAid":["step1","step2","step3","step4"],
 "confidence":"low|medium|high"
}`;
  const body = { model:"gpt-4o-mini", input: prompt, temperature:0.2 };
  const r = await fetch("https://api.openai.com/v1/responses", {
    method:"POST",
    headers:{
      "Authorization":`Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type":"application/json"
    },
    body: JSON.stringify(body)
  });
  const j = await r.json();
  const raw = j.output?.[0]?.content?.[0]?.text || j.output_text || "";
  try { return JSON.parse(raw); }
  catch {
    return {
      alert:`Possible accident near ${lat},${lon}`,
      firstAid:[
        "Ensure your safety first",
        "Call emergency services",
        "Control bleeding with pressure",
        "Do not move head/neck injuries"
      ],
      confidence:"medium"
    };
  }
}

// TTS generation
async function generateTTS(text){
  const r = await fetch("https://api.openai.com/v1/audio/speech", {
    method:"POST",
    headers:{
      "Authorization":`Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type":"application/json"
    },
    body: JSON.stringify({ model:"gpt-4o-mini-tts", voice:"alloy", input:text })
  });
  const buffer = Buffer.from(await r.arrayBuffer());
  const filename = `tts-${Date.now()}.mp3`;
  fs.writeFileSync(`./public/${filename}`, buffer);
  return `/public/${filename}`;
}

// Report endpoint
app.post("/api/report", upload.single("image"), async (req,res)=>{
  try{
    const {lat, lon, desc, severity} = req.body;
    const img = req.file?.buffer;
    if(!lat || !lon || !img) return res.status(400).json({error:"Missing image or coordinates"});

    const imgName = `uploads/${Date.now()}-${req.file.originalname}`;
    fs.writeFileSync(imgName, img);

    const scene = await describeScene(img);
    const address = await reverseGeocode(lat, lon);
    const places = await nearbyPlaces(lat, lon);
    const result = await produceAlert(scene, lat, lon, address);

    // SMS alert
    const smsBody = `${result.alert}\nLocation: https://maps.google.com/?q=${lat},${lon}`;
    let smsSent = false;
    try {
      await tw.messages.create({
        body: smsBody,
        from: process.env.TWILIO_NUMBER,
        to: process.env.MY_NUMBER
      });
      smsSent = true;
    } catch(e){ console.error("Twilio error:", e.message); }

    const tts_url = await generateTTS(smsBody);

    res.json({ scene, result, smsSent, tts_url, places });
  } catch(e){
    console.error(e);
    res.status(500).json({error:String(e)});
  }
});

app.use("/public", express.static(path.join(process.cwd(),"public")));

app.listen(port,()=>console.log(`✅ RoadGuardian backend running at http://localhost:${port}`));
