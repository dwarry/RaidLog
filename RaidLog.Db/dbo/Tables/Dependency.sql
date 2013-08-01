CREATE TABLE [dbo].[Dependency] (
    [Id]               INT             IDENTITY (1, 1) NOT NULL,
    [ProjectId]        INT             NOT NULL,
    [DependencyNumber] INT             NOT NULL,
    [Status]           NVARCHAR (10)   NOT NULL,
    [Workstream]       NVARCHAR (50)   NOT NULL,
    [Description]      NVARCHAR (2048) NOT NULL,
    [PlannedDate]      DATE            NOT NULL,
    [RequiredByDate]   DATE            NOT NULL,
    [Comments]         NVARCHAR (2048) NOT NULL,
    [RAG]              NCHAR (1)       NOT NULL,
    [DependencyLevel]  NVARCHAR (50)   NOT NULL,
    CONSTRAINT [PK_Dependency] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Dependency_Project] FOREIGN KEY ([ProjectId]) REFERENCES [dbo].[Project] ([Id])
);


GO


GO


GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_Dependency]
    ON [dbo].[Dependency]([ProjectId] ASC, [DependencyNumber] ASC);

