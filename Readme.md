# Solana Calculator Program

This project implements a **simple calculator** on the Solana blockchain using the **Anchor framework**. The calculator supports basic arithmetic operations like addition, subtraction, multiplication, and division.

---

## Features

- **Create Calculator**: Initialize the calculator account with a custom greeting message.
- **Addition**: Add two numbers and store the result.
- **Subtraction**: Subtract two numbers and store the result.
- **Multiplication**: Multiply two numbers and store the result.
- **Division**: Divide two numbers, storing the quotient and remainder.

---

## Code Overview

### **Program Instructions**

1. **`create`**
   Initializes a calculator account with a custom greeting message.
   - **Arguments**: `init_message: String`

2. **`add`**
   Adds two numbers and stores the result in the calculator account.
   - **Arguments**: `num1: i64, num2: i64`

3. **`sub`**
   Subtracts the second number from the first and stores the result.
   - **Arguments**: `num1: i64, num2: i64`

4. **`mul`**
   Multiplies two numbers and stores the result.
   - **Arguments**: `num1: i64, num2: i64`

5. **`div`**
   Divides the first number by the second, storing both the quotient and the remainder.
   - **Arguments**: `num1: i64, num2: i64`
