CREATE TABLE [dbo].[RiskDocument] (
    [RiskDocumentId] INT            NOT NULL,
    [RiskId]         INT            NOT NULL,
    [DocumentUrl]    NVARCHAR (256) NOT NULL,
    CONSTRAINT [PK_RiskDocument] PRIMARY KEY CLUSTERED ([RiskDocumentId] ASC),
    CONSTRAINT [FK_RiskDocument_Risk] FOREIGN KEY ([RiskId]) REFERENCES [dbo].[Risk] ([Id])
);

