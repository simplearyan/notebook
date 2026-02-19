---
title: "Lesson 1: Continuous Random Variables"
description: "Introduction to continuous random variables and PDFs."
order: 31
---

# Lesson 1: Continuous Random Variables

## Probability Density Function (PDF)
For a continuous random variable $X$, the PDF $f(x)$ describes the relative likelihood of the random variable taking a value near $x$.
$$ P(a \le X \le b) = \int_a^b f(x) dx $$

Properties:
1. $f(x) \ge 0$
2. $\int_{-\infty}^{\infty} f(x) dx = 1$

## Cumulative Distribution Function (CDF)
$$ F(x) = P(X \le x) = \int_{-\infty}^x f(t) dt $$

## Expectation and Variance
$$ E[X] = \int_{-\infty}^{\infty} x f(x) dx $$
$$ Var(X) = E[X^2] - (E[X])^2 $$
