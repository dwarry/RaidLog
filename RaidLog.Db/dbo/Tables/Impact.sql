CREATE TABLE [dbo].[Impact] (
    [Id]           INT            IDENTITY (1, 1) NOT NULL,
    [Description]        NVARCHAR (50)  NOT NULL,
    [Score]              INT            NOT NULL,
    [BudgetImpact]       NVARCHAR (50)  NOT NULL,
    [TimeOverrunImpact]  NVARCHAR (50)  NOT NULL,
    [ReputationalImpact] NVARCHAR (150) NOT NULL,
    [BusinessImpact]     NVARCHAR (150) NOT NULL,
    CONSTRAINT [PK_Impact] PRIMARY KEY CLUSTERED ([Id] ASC)
);

