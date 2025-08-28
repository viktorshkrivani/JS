# Project 1 🌍 — Countries and Flags

## Overview
This project demonstrates basic **JavaScript DOM manipulation and event handling** by dynamically swapping images and updating text on a webpage.  
When the user hovers over a country’s flag, the image changes to display a map of that country, and the page header updates to show the country’s name.

## Features
- **Image Swap on Hover**  
  Flags are replaced with corresponding country maps when hovered.  
- **Dynamic Header Update**  
  The `<h1>` text changes from *"Countries and Flags"* to the name of the selected country.  
- **Smooth CSS Effects**  
  Flags enlarge with a smooth transition on hover for better user interactivity.  
- **Modular JavaScript**  
  Logic is separated into reusable functions (`updateHeaderAndImage`, `resetHeaderAndImage`).  

## Technologies Used
- **HTML5** — Webpage structure.  
- **CSS3** — Layout, styling, hover animations.  
- **JavaScript (Vanilla)** — DOM manipulation and event handling.

## How It Works
1. **Default View**: Displays 3 flags (Albania, America, Puerto Rico).  
2. **Hover Over a Flag**:  
   - Flag changes into its corresponding map image.  
   - Header text changes to display the country’s name.  
3. **Mouse Out**:  
   - Flag reverts back to the original image.  
   - Header text resets to *"Countries and Flags"*.  

## Example
- Hover over the **Albania flag** → image swaps to Albania map, header shows *"Albania"*.  
- Hover off → resets back to original flag and default header. 
