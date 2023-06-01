import numpy as np
from matplotlib import pyplot as plt
print("imports done")

dx = 50
# Create numpy array of object counts
energy_level = np.linspace(0, 5, dx)

print(energy_level)

particles = np.rint(100*np.exp(-energy_level)).astype(int)

particles = np.repeat(energy_level, particles)

print(sum(particles))

plt.hist(particles, bins=dx)
plt.show()