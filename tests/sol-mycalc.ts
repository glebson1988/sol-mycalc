const assert = require("assert");
const anchor = require("@coral-xyz/anchor");
const { Keypair, SystemProgram } = require("@solana/web3.js");

describe("sol-mycalc", () => {
  // Initialize the provider
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  // Load the program from the workspace
  const program = anchor.workspace.SolMycalc;

  // Generate a new keypair for the Calculator account
  const calculatorKeypair = Keypair.generate();

  it("Creates a calculator", async () => {
    // Call the "create" method on the program
    await program.methods
      .create("Welcome to Solana") // Pass the initialization message
      .accounts({
        calculator: calculatorKeypair.publicKey, // Public key for the Calculator account
        user: provider.wallet.publicKey, // The wallet paying for the transaction
        systemProgram: SystemProgram.programId, // Solana's system program
      })
      .signers([calculatorKeypair]) // Sign the transaction with the Calculator account keypair
      .rpc();

    // Fetch the account data from the blockchain
    const account = await program.account.calculator.fetch(
      calculatorKeypair.publicKey
    );

    // Assert that the greeting message is correctly saved
    assert.strictEqual(account.greeting, "Welcome to Solana");
  });
});
