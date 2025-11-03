

export const evaluateCondition = (condition, context) => {
  try {
    const keys = Object.keys(context);
    let expression = condition;

    keys.forEach((key) => {
      const value = context[key];
      const safeValue =
        typeof value === "string" ? `'${value}'` : String(value);
      expression = expression.replace(new RegExp(`\\b${key}\\b`, "g"), safeValue);
    });

    // eslint-disable-next-line no-eval
    return eval(expression);
  } catch (error) {
    console.error("Error evaluating condition:", error);
    return false;
  }
};

export const evalRule = evaluateCondition;
