CREATE TABLE [dbo].[Approach] (
    [Id]  INT           IDENTITY (1, 1) NOT NULL,
    [Description] NVARCHAR (50) NOT NULL,
    CONSTRAINT [PK_Approach] PRIMARY KEY CLUSTERED ([Id] ASC)
);

