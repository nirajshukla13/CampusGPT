"""Parse academic calendar PDF and extract events."""
import pypdf
import re
from datetime import datetime
import json

def parse_academic_calendar(pdf_path):
    """Extract events from academic calendar PDF."""
    events = []
    
    try:
        # Read PDF
        with open(pdf_path, 'rb') as file:
            pdf_reader = pypdf.PdfReader(file)
            
            # Extract text from all pages
            full_text = ""
            for page in pdf_reader.pages:
                full_text += page.extract_text() + "\n"
            
            print("=== PDF CONTENT ===")
            print(full_text[:2000])  # Print first 2000 chars
            print("...")
            print("===================")
            
            # Save to file for analysis
            with open('calendar_text.txt', 'w', encoding='utf-8') as f:
                f.write(full_text)
            
            print("\nText extracted and saved to calendar_text.txt")
            print(f"Total characters: {len(full_text)}")
            
    except Exception as e:
        print(f"Error parsing PDF: {e}")
        import traceback
        traceback.print_exc()
    
    return events

if __name__ == "__main__":
    pdf_path = r"C:\Desktop\CampusGPT\Final Academic Calendar-Student 2025-26  even semester.pdf"
    events = parse_academic_calendar(pdf_path)
    print(f"\nExtracted {len(events)} events")
