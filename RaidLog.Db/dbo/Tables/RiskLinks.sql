CREATE TABLE [dbo].[RiskLinks] (
    [ParentRiskId] INT NOT NULL,
    [ChildRiskId]  INT NOT NULL,
    CONSTRAINT [PK_RiskLinks] PRIMARY KEY CLUSTERED ([ParentRiskId] ASC, [ChildRiskId] ASC),
    CONSTRAINT [FK_RiskLinks_Risk_Parent] FOREIGN KEY ([ParentRiskId]) REFERENCES [dbo].[Risk] ([Id]),
    CONSTRAINT [FK_RiskLinks_RiskLinks_Child] FOREIGN KEY ([ChildRiskId]) REFERENCES [dbo].[Risk] ([Id]),
    CONSTRAINT [CK_RiskLinks_NoSelfLinks] CHECK ([ParentRiskId] <> [ChildRiskId])
);

