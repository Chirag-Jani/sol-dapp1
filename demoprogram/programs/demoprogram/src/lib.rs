use anchor_lang::prelude::*;

declare_id!("8hgoWMEXWCPLg7kPMx6T3Ykyukqtyk71PRvUmrhqpM61");

#[program]
pub mod demoprogram {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
