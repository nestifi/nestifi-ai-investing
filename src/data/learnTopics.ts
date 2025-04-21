
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  feedbackCorrect: string;
  feedbackIncorrect: string;
}

export interface LearnTopic {
  id: string;
  title: string;
  description: string;
  progress: number; // 0-100
  imageUrl: string;
  article: string;
  quiz: QuizQuestion[];
}

export const learnTopics: LearnTopic[] = [
  {
    id: "credit-score",
    title: "Credit Score",
    description: "Understanding the basics of credit scores and how they impact your financial life",
    progress: 0,
    imageUrl: "/images/credit-score.png",
    article: `
      # Understanding Credit Scores

      A credit score is a numerical expression based on a level analysis of a person's credit files, to represent the creditworthiness of an individual. A credit score is primarily based on a credit report, information typically sourced from credit bureaus.
      
      ## Why Credit Scores Matter

      Credit scores play a crucial role in determining whether you'll be approved for a loan or credit card and what interest rate you'll receive. Higher scores can lead to better terms and lower interest rates.
      
      ## How Credit Scores Are Calculated

      Credit scores are typically calculated based on:
      
      - Payment history (35%)
      - Credit utilization (30%)
      - Length of credit history (15%)
      - New credit accounts (10%)
      - Credit mix (10%)
      
      ## Improving Your Credit Score

      1. Pay your bills on time
      2. Keep your credit utilization ratio below 30%
      3. Don't close old credit accounts unless necessary
      4. Limit applications for new credit
      5. Regularly check your credit report for errors
      
      By understanding how credit scores work, you can take steps to improve yours over time.
    `,
    quiz: [
      {
        id: "cs-q1",
        question: "Which of the following entities primarily use credit scores to evaluate the potential risk posed by lending money to consumers?",
        options: [
          "Mobile phone companies",
          "Insurance companies",
          "Banks and credit card companies",
          "Government departments"
        ],
        correctAnswerIndex: 2,
        feedbackCorrect: "Correct! Banks and credit card companies rely on credit scores to evaluate borrowers' creditworthiness and determine lending terms.",
        feedbackIncorrect: "Incorrect. While other entities may check credit, banks and credit card companies primarily use credit scores to evaluate lending risk."
      },
      {
        id: "cs-q2",
        question: "What percentage of your credit score is typically determined by your payment history?",
        options: [
          "15%",
          "25%",
          "35%",
          "45%"
        ],
        correctAnswerIndex: 2,
        feedbackCorrect: "Correct! Payment history accounts for about 35% of your credit score and is the most important factor.",
        feedbackIncorrect: "Incorrect. Payment history accounts for about 35% of your credit score, making it the most significant factor."
      },
      {
        id: "cs-q3",
        question: "What is considered an excellent credit score in the FICO model?",
        options: [
          "580-669",
          "670-739",
          "740-799",
          "800-850"
        ],
        correctAnswerIndex: 3,
        feedbackCorrect: "Correct! A FICO score between 800 and 850 is considered excellent credit.",
        feedbackIncorrect: "Incorrect. A FICO score between 800 and 850 is considered excellent credit."
      }
    ]
  },
  {
    id: "compound-interest",
    title: "Compound Interest",
    description: "Learn how compound interest works and how it can help grow your savings",
    progress: 0,
    imageUrl: "/images/compound-interest.png",
    article: `
      # The Power of Compound Interest

      Compound interest is the addition of interest to the principal sum of a loan or deposit, or in other words, interest on interest. It is the result of reinvesting interest, rather than paying it out, so that interest in the next period is then earned on the principal sum plus previously accumulated interest.

      ## How Compound Interest Works

      When you invest money, you earn interest on your capital. The next year, you earn interest on both your original capital and the interest from the first year. In the third year, you earn interest on your original capital and the interest from the first two years, and so on.

      ## The Rule of 72

      The Rule of 72 is a simplified way to determine how long an investment will take to double given a fixed annual rate of interest. By dividing 72 by the annual rate of return, investors obtain a rough estimate of how many years it will take for the initial investment to duplicate itself.

      For example, if your account earns 6% annual interest, it will take 72 ÷ 6 = 12 years for your money to double.

      ## Start Early

      The key to maximizing the benefits of compound interest is to start saving and investing as early as possible, even if it's just a small amount. The longer your money has to grow, the more dramatic the effects of compounding will be on your investment returns.

      Remember, time is your most valuable asset when it comes to compound interest!
    `,
    quiz: [
      {
        id: "ci-q1",
        question: "What is compound interest?",
        options: [
          "Interest calculated only on the initial principal",
          "Interest calculated on both the initial principal and accumulated interest",
          "A fixed interest rate that never changes",
          "Interest paid directly to your bank account"
        ],
        correctAnswerIndex: 1,
        feedbackCorrect: "Correct! Compound interest is calculated on both the initial principal and the accumulated interest.",
        feedbackIncorrect: "Incorrect. Compound interest is calculated on both the initial principal and any accumulated interest from previous periods."
      },
      {
        id: "ci-q2",
        question: "According to the Rule of 72, approximately how long would it take for an investment to double at 8% annual interest?",
        options: [
          "7 years",
          "9 years",
          "12 years",
          "15 years"
        ],
        correctAnswerIndex: 1,
        feedbackCorrect: "Correct! Using the Rule of 72, at 8% interest, it would take approximately 72 ÷ 8 = 9 years for your investment to double.",
        feedbackIncorrect: "Incorrect. Using the Rule of 72, at 8% interest, it would take approximately 72 ÷ 8 = 9 years for your investment to double."
      },
      {
        id: "ci-q3",
        question: "Why is starting to invest early particularly advantageous when it comes to compound interest?",
        options: [
          "Because interest rates are always higher for younger investors",
          "Because younger investors can always invest larger amounts",
          "Because the effects of compounding increase dramatically over time",
          "Because banks offer special accounts only to new investors"
        ],
        correctAnswerIndex: 2,
        feedbackCorrect: "Correct! The effects of compounding increase dramatically over time, making an early start extremely valuable.",
        feedbackIncorrect: "Incorrect. The true advantage is that the effects of compounding increase dramatically over time, making an early start extremely valuable."
      }
    ]
  },
  {
    id: "credit-cards",
    title: "Credit Cards",
    description: "Managing credit cards responsibly and avoiding common pitfalls",
    progress: 0,
    imageUrl: "/images/credit-cards.png",
    article: `
      # Using Credit Cards Wisely

      Credit cards can be powerful financial tools when used responsibly. They offer convenience, build credit history, and sometimes provide rewards. However, they can also lead to debt problems if not managed properly.

      ## Benefits of Credit Cards

      - **Convenience**: Easy to carry and widely accepted
      - **Build Credit**: Regular, on-time payments improve your credit score
      - **Purchase Protection**: Many cards offer protection against fraud and defective purchases
      - **Rewards**: Points, miles, or cash back on purchases
      - **Emergency Use**: Available credit during unexpected situations

      ## Common Credit Card Pitfalls

      - **High Interest Rates**: Credit card interest can exceed 20% APR
      - **Minimum Payments**: Paying only minimums can lead to years of debt
      - **Fees**: Annual fees, late payment fees, foreign transaction fees
      - **Credit Score Impact**: Missed payments and high utilization harm your score
      - **Overspending**: The convenience of cards can lead to spending beyond your means

      ## Tips for Responsible Use

      1. Pay your balance in full each month
      2. Keep your credit utilization below 30%
      3. Pay on time, every time
      4. Review statements for unauthorized charges
      5. Choose a card with benefits that match your spending habits
      6. Don't apply for too many cards in a short period
      7. Avoid cash advances when possible

      By following these guidelines, you can enjoy the benefits of credit cards while avoiding the potential drawbacks.
    `,
    quiz: [
      {
        id: "cc-q1",
        question: "What is a good rule of thumb for credit utilization ratio?",
        options: [
          "Keep it below 10%",
          "Keep it below 30%",
          "Keep it below 50%",
          "Keep it below 80%"
        ],
        correctAnswerIndex: 1,
        feedbackCorrect: "Correct! Financial experts generally recommend keeping your credit utilization ratio below 30% to maintain a good credit score.",
        feedbackIncorrect: "Incorrect. Financial experts generally recommend keeping your credit utilization ratio below 30% to maintain a good credit score."
      },
      {
        id: "cc-q2",
        question: "What typically happens if you only make minimum payments on your credit card?",
        options: [
          "Your debt is paid off faster",
          "You save money on interest",
          "Your credit score increases rapidly",
          "You pay much more in interest over time"
        ],
        correctAnswerIndex: 3,
        feedbackCorrect: "Correct! Making only minimum payments extends the repayment period and results in paying much more in interest over time.",
        feedbackIncorrect: "Incorrect. Making only minimum payments extends the repayment period and results in paying much more in interest over time."
      },
      {
        id: "cc-q3",
        question: "Which of the following credit card practices is most likely to improve your credit score?",
        options: [
          "Maxing out your credit limit every month but paying the minimum",
          "Having many credit cards and using them all frequently",
          "Paying your full balance on time consistently",
          "Requesting credit limit increases every month"
        ],
        correctAnswerIndex: 2,
        feedbackCorrect: "Correct! Consistently paying your full balance on time is one of the best ways to improve your credit score.",
        feedbackIncorrect: "Incorrect. Consistently paying your full balance on time is one of the best ways to improve your credit score."
      }
    ]
  }
];
