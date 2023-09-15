# P5 Test

### Ideas para un proyecto público

- Hacer un website con minijuegos mobile
  - sudoku
  - snake (a ultra alta velocidad)
  - 2048
  - entrenamiento para pilotos (esquivar figuras que aceleran)
  - buscaminas
  - geometry wars
  - wordle
  - life simulator (flocking + steering behaviour + multiple entities)
  - https://www.tiktok.com/@newscientist/video/7252064758625553690

### TODO's

- Snapshot of all velocities
- Optimization with quadtree or subdivision
- More sophisticated interface with better parameter variation and handling
- Boids with different initial parameters

- Simple behaviors for individuals and pairs:
  - Seek and Flee
  - Pursue and Evade
  - Wander
  - Arrival
  - Obstacle Avoidance
  - Containment
  - Wall Following
  - Path Following
  - Flow Field Following
- Combined behaviors and groups:
  - Crowd Path Following
  - Leader Following
  - Unaligned Collision Avoidance
  - Queuing (at a doorway)
  - Flocking (combining: separation, alignment, cohesion)

# Notes

- Scalar: Is a magnitude (something that could scale their value) without direction.
- Vector: A quantity having direction as well as magnitude.
  - The Vector magnitude could be think as its arrow length representation, or equals to the value of the hypotenuse of the triangle formed by their x,y components.
  - The Vector direction could be think as its arrow's angle in the cartesian system representation.
  - A lot of the math with vector (particulary in two dimensional space) relates to trigonometry and all the same math associated with right triangles.
  - Normalization: Make the magnitude value 1 (called unit vector).
- Position: The point relative to the origin
- Velocity: The change of position over time (tell how to move from one location to another), or the rate of change of location.
- Acceleration: The change of velocity over time
- Force: A force is a vector that causes an object with mass to accelerate.

- Newton's First Law: An object at rest stays at rest and an object in motion stays in motion at a constant speed and direction unless acted upon by an unbalanced force.
- Newton's Thirth Law: Forces always occur in pairs. The two forces are of equal strength, but in opposite directions.
- Newton’s Second Law: Net Force equals mass times acceleration, or acceleration is equal to the sum of all forces divided by mass.
  - All the forces should be sum and divided by the total amount of forces applied.
  - Also the acceleration should be set to zero in order to prevent the force accumulation over time.
