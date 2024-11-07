# Generative Artwork Animation: Interactive Circular Patterns

## Instructions

1. **Load the Project**: Open the `index.html` file in a modern browser that supports WebGL and the p5.js library.
2. **Interaction**:
   - **Move the mouse**: Slowly move the mouse over the screen to interact with the decorative beads.
   - **Play Music**: Click the "Play/Pause" button to start or stop the audio. The animation dynamically responds to the music.
3. **Experience the Animation**:
   - The circular patterns change size and colors based on the audio frequencies.
   - Connections between beads glow dynamically with a wavy effect.

## Individual Approach to Animation

### Animation Driver
I chose **audio analysis** (using FFT) to drive the animation. The circular patterns adjust their size and colors dynamically based on the music frequencies.

### Unique Animated Properties
- **Color Dynamics**: When the music is playing, the background, internal pattern, and dots change colors dynamically, creating a vibrant, reactive effect.
- **Size Scaling**: The size of the circular patterns scales in real-time based on the FFT spectrum values, making each pattern "pulse" with the music.
- **Glowing Connections**: Curved connections between the decorative beads maintain a glowing effect, emphasizing smooth transitions.

These properties are unique to my implementation, ensuring a distinct visual style compared to my group members.

## Inspiration and References

1. **Inspiration**:
   - Traditional mandala patterns influenced the concentric circles.
   - Dynamic color changes were inspired by visualizers like Winamp's MilkDrop.
   - The glowing connections take inspiration from neon light aesthetics.

2. **References**:
   - [p5.js Documentation](https://p5js.org/reference/): Used for integrating audio and drawing functions.
   - [Generative Design Book](https://www.generative-gestaltung.de/): Inspired the use of Perlin noise for organic movement.

## Technical Explanation

### How It Works
1. **Audio Integration**:
   - The FFT library from p5.js analyzes the audio in real time.
   - The spectrum values are mapped to a range to control the size scaling of patterns.
2. **Color Dynamics**:
   - When the music is playing, the `updateColors()` method randomly generates RGB values to change the background and pattern colors.
   - These updates happen before rendering, ensuring seamless transitions.
3. **Size Scaling**:
   - The `adjustSize(scaleFactor)` method modifies the radius of each pattern using the spectrum values.
   - Patterns pulse in sync with the music.

### Changes to Group Code
1. Added the **`adjustSize`** method to allow dynamic scaling of circular patterns.
2. Integrated FFT analysis to drive the animation properties.
3. Introduced the `updateColors()` method to handle dynamic color changes based on audio state.

## Tools and Techniques

### External Tools
- **p5.js Sound Library**: Used for FFT-based audio analysis.
- **Perlin Noise**: Applied to create organic, wavy effects for the connections between beads.

### Techniques from the Internet
- **Dynamic Colors**:
  - Adapted from tutorials on random RGB generation in p5.js.
  - Source: [p5.js Color Tutorials](https://p5js.org/examples/color-color-variables.html).
  - Explained: RGB values are generated using the `random()` function to create unpredictable but smooth transitions.
