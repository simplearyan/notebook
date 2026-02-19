---
title: "Lesson 1: Joint Distributions"
description: "Understanding joint probability for multiple random variables."
order: 21
---

# Lesson 1: Joint Distributions

## Joint Probability Mass Function
For two discrete random variables $X$ and $Y$, the joint PMF is:
$$ P(X = x, Y = y) = p(x, y) $$

## Marginal Distributions
To find the distribution of just $X$ from the joint distribution, we sum over all possible values of $Y$:
$$ p_X(x) = \sum_y p(x, y) $$

## Independence
Two random variables $X$ and $Y$ are independent if and only if:
$$ p(x, y) = p_X(x) \cdot p_Y(y) $$
for all $x$ and $y$.
