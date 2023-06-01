import json
import numpy as np
import matplotlib.pyplot as plt
from scipy.optimize import curve_fit
import math

n = 2000
T = 50
m = 6.6464731 * (10 ** -27)
k_B = 1.380649 * (10**-23)

dx = 20

def boltzmann(x, a):
    return a * m * x * np.exp(-x * x * a * m / 2)

arr = np.array(json.load(open("speed250T3.json")))

arr = np.sort(arr)

num_bins = np.int64(arr[-1]/dx)

# plt.hist(arr, bins=num_bins)

counts,bin_edges = np.histogram(arr,bins=num_bins)
bin_centres = (bin_edges[:-1] + bin_edges[1:])/2.

counts = (counts / n) / dx

plt.plot(bin_centres, counts, 'bo', markersize=1)

v = np.linspace(0, 3000)

pars, _ = curve_fit(f=boltzmann, xdata=bin_centres, ydata=counts, bounds=[10**20,10**22])

print(pars)
# print(1 / k_B * T)

plt.plot(v, boltzmann(v, pars))

const = 1 / (k_B * T)
print(const)

f = const * v * np.exp((-(const) * (v**2)) / 2)

# line = plt.plot(v, f, label="distrib")

plt.xlabel("Particle speeds (m/s)")
plt.ylabel("Speed density (1/(m/s))")
plt.show()
# print(arr)