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
    const account = await program.account.calculator.fetch(calculatorKeypair.publicKey);

    // Assert that the greeting message is correctly saved
    assert.strictEqual(account.greeting, "Welcome to Solana");
  });

  it("Adds two numbers", async () => {
    await program.rpc.add(new anchor.BN(2), new anchor.BN(3), {
      accounts: {
        calculator: calculatorKeypair.publicKey,
      },
    });

    const account = await program.account.calculator.fetch(calculatorKeypair.publicKey);

    assert.ok(account.result.eq(new anchor.BN(5)));
  });

  it("Subtracts two numbers", async () => {
    await program.rpc.sub(new anchor.BN(10), new anchor.BN(5), {
      accounts: {
        calculator: calculatorKeypair.publicKey,
      },
    });

    const account = await program.account.calculator.fetch(calculatorKeypair.publicKey);

    assert.ok(account.result.eq(new anchor.BN(5)));
  });

  it("Multiplies two numbers", async () => {
    await program.rpc.mul(new anchor.BN(2), new anchor.BN(3), {
      accounts: {
        calculator: calculatorKeypair.publicKey,
      },
    });

    const account = await program.account.calculator.fetch(calculatorKeypair.publicKey);

    assert.ok(account.result.eq(new anchor.BN(6)));
  });

  it("Divides two numbers", async () => {
    await program.rpc.div(new anchor.BN(10), new anchor.BN(3), {
      accounts: {
        calculator: calculatorKeypair.publicKey,
      },
    });

    const account = await program.account.calculator.fetch(calculatorKeypair.publicKey);

    assert.ok(account.result.eq(new anchor.BN(3)));
    assert.ok(account.reminder.eq(new anchor.BN(1)));
  });
});
