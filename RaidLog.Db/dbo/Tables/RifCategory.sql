CREATE TABLE [dbo].[RifCategory] (
    [Id] INT           IDENTITY (1, 1) NOT NULL,
    [Description]   NVARCHAR (50) NOT NULL,
    CONSTRAINT [PK_RifCategory] PRIMARY KEY CLUSTERED ([Id] ASC)
);

