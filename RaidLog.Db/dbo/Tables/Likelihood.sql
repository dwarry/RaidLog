CREATE TABLE [dbo].[Likelihood] (
    [Id] INT           IDENTITY (1, 1) NOT NULL,
    [Description]  NVARCHAR (50) NOT NULL,
    [Score]        INT           NOT NULL,
    CONSTRAINT [PK_Likelihood] PRIMARY KEY CLUSTERED ([Id] ASC)
);

