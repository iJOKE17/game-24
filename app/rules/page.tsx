
const RulesPage = () => (
  <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 py-10">
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Game Rules</h1>
      <ul>
        <li>Rule 1: We will provide 4 numbers. With +, -, *, / </li>
        <li>Rule 2: Use each number exactly once to make 24.</li>
        <li>
          Rule 3: You can use parentheses to change the order of operations.
        </li>
        <li>Rule 4: Have Fun ^_^</li>
      </ul>
    </div>
  </main>
);

export default RulesPage;
