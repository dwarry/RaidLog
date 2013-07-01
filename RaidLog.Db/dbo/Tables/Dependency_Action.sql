CREATE TABLE [dbo].[Dependency_Action] (
    [DependencyId]   INT NOT NULL,
    [ActionId] INT NOT NULL,
    CONSTRAINT [PK_Dependency_Action] PRIMARY KEY CLUSTERED ([DependencyId] ASC, [ActionId] ASC),
    CONSTRAINT [FK_Dependency_Action_Action] FOREIGN KEY ([ActionId]) REFERENCES [dbo].[Action] ([Id]),
    CONSTRAINT [FK_Dependency_Action_Dependency] FOREIGN KEY ([DependencyId]) REFERENCES [dbo].[Dependency] ([Id])
);
