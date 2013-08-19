CREATE TABLE [dbo].[Query_Action] (
    [QueryId]  INT NOT NULL,
    [ActionId] INT NOT NULL,
    CONSTRAINT [PK_Query_Action] PRIMARY KEY CLUSTERED ([QueryId] ASC, [ActionId] ASC),
    CONSTRAINT [FK_Query_Action_Action] FOREIGN KEY ([ActionId]) REFERENCES [dbo].[Action] ([Id]),
    CONSTRAINT [FK_Query_Action_Query] FOREIGN KEY ([QueryId]) REFERENCES [dbo].[Query] ([Id])
);

