use anchor_lang::prelude::*;

declare_id!("DLooCc9TPNAB4EdazPb2TGzo7URacxiJ9XwZHSYTaPP7");

#[program]
pub mod sol_mycalc {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
