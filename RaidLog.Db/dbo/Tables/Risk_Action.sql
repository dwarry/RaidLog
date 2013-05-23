CREATE TABLE [dbo].[Risk_Action] (
    [RiskId]   INT NOT NULL,
    [ActionId] INT NOT NULL,
    CONSTRAINT [PK_Risk_Action] PRIMARY KEY CLUSTERED ([RiskId] ASC, [ActionId] ASC),
    CONSTRAINT [FK_Risk_Action_Action] FOREIGN KEY ([ActionId]) REFERENCES [dbo].[Action] ([Id]),
    CONSTRAINT [FK_Risk_Action_Risk] FOREIGN KEY ([RiskId]) REFERENCES [dbo].[Risk] ([Id])
);

