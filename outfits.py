from openai import OpenAI
from dotenv import load_dotenv
import os
import json
import time

# Load API key from .env
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

# Create OpenAI client
client = OpenAI(api_key=api_key)

# Load your outfits.json
with open("outfits.json", "r") as f:
    outfits = json.load(f)

outfits_with_images = {}

def generate_image(prompt):
    try:
        response = client.images.generate(
            model="dall-e-3",
            prompt=prompt,
            n=1,
            size="1024x1024",
            quality="standard"
        )
        url = response.data[0].url
        print(f"✅ Generated: {prompt} -> {url}")
        return url
    except Exception as e:
        print(f"❌ Error: {e}")
        return None

# Loop through all outfits
for body_type, categories in outfits.items():
    outfits_with_images[body_type] = {}
    for category, outfit_list in categories.items():
        outfits_with_images[body_type][category] = []
        for outfit in outfit_list:
            prompt = f"{outfit}, studio fashion photo, front view, full body, realistic lighting"
            image_url = generate_image(prompt)
            outfits_with_images[body_type][category].append({
                "description": outfit,
                "image": image_url
            })
            time.sleep(1.5)  # To respect OpenAI rate limits

# Save the results
with open("outfits_with_images.json", "w") as f:
    json.dump(outfits_with_images, f, indent=2)

print("🎉 Done! Saved all images to outfits_with_images.json")
