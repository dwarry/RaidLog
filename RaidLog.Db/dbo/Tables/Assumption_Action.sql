CREATE TABLE [dbo].[Assumption_Action] (
    [AssumptionId]   INT NOT NULL,
    [ActionId] INT NOT NULL,
    CONSTRAINT [PK_Assumption_Action] PRIMARY KEY CLUSTERED ([AssumptionId] ASC, [ActionId] ASC),
    CONSTRAINT [FK_Assumption_Action_Action] FOREIGN KEY ([ActionId]) REFERENCES [dbo].[Action] ([Id]),
    CONSTRAINT [FK_Assumption_Action_Assumption] FOREIGN KEY ([AssumptionId]) REFERENCES [dbo].[Assumption] ([Id])
);
