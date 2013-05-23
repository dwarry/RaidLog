CREATE TABLE [dbo].[RiskEvaluation] (
    [RiskId]         INT           NOT NULL,
    [EvaluationDate] DATE          NOT NULL,
    [ImpactId]       INT           NOT NULL,
    [LikelihoodId]   INT           NOT NULL,
    [Owner]          NVARCHAR (50) NULL,
    CONSTRAINT [PK_RiskEvaluation] PRIMARY KEY CLUSTERED ([RiskId] ASC, [EvaluationDate] ASC),
    CONSTRAINT [FK_RiskEvaluation_Risk] FOREIGN KEY ([RiskId]) REFERENCES [dbo].[Risk]([Id]),
    CONSTRAINT [FK_RiskEvaluation_Impact] FOREIGN KEY ([ImpactId]) REFERENCES [dbo].[Impact] ([Id]),
    CONSTRAINT [FK_RiskEvaluation_Likelihood] FOREIGN KEY ([LikelihoodId]) REFERENCES [dbo].[Likelihood] ([Id])
);

