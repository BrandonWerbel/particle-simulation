import numpy as np
import matplotlib.pyplot as plt
from scipy.optimize import curve_fit

def best_fit(T, b):
    return b / (T)

alpha_vals = [
    9.573 * (10 **20),
    4.608 * (10 **20),
    2.929 * (10 **20),
    2.265 * (10 **20),
    1.844 * (10 **20)]

temp_levels = [50,100,150,200,250]

plt.plot(temp_levels, alpha_vals, 'bo')

plt.xlabel("Temperature (K)")
plt.ylabel("Average alpha value (1/J)")

pars, _ = curve_fit(f=best_fit, xdata=temp_levels, ydata=alpha_vals, bounds=[10**22,10**23])

x = np.linspace(50, 250)
plt.plot(x, best_fit(x, pars[0]))

print(pars)


plt.show()