CREATE TABLE [dbo].[RiskEvaluation] (
    [RiskId]         INT           NOT NULL,
    [EvaluationDate] DATETIME2 (7) NOT NULL,
    [ImpactId]       INT           NOT NULL,
    [LikelihoodId]   INT           NOT NULL,
    [Owner]          NVARCHAR (50) NULL,
    [IsActive]       BIT           CONSTRAINT [DF_RiskEvaluation_IsActive] DEFAULT ((1)) NOT NULL,
    CONSTRAINT [PK_RiskEvaluation] PRIMARY KEY CLUSTERED ([RiskId] ASC, [EvaluationDate] ASC),
    CONSTRAINT [FK_RiskEvaluation_Impact] FOREIGN KEY ([ImpactId]) REFERENCES [dbo].[Impact] ([Id]),
    CONSTRAINT [FK_RiskEvaluation_Likelihood] FOREIGN KEY ([LikelihoodId]) REFERENCES [dbo].[Likelihood] ([Id]),
    CONSTRAINT [FK_RiskEvaluation_Risk] FOREIGN KEY ([RiskId]) REFERENCES [dbo].[Risk] ([Id])
);



