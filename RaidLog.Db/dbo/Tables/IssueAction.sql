CREATE TABLE [dbo].[Issue_Action] (
    [IssueId]   INT NOT NULL,
    [ActionId] INT NOT NULL,
    CONSTRAINT [PK_Issue_Action] PRIMARY KEY CLUSTERED ([IssueId] ASC, [ActionId] ASC),
    CONSTRAINT [FK_Issue_Action_Action] FOREIGN KEY ([ActionId]) REFERENCES [dbo].[Action] ([Id]),
    CONSTRAINT [FK_Issue_Action_Issue] FOREIGN KEY ([IssueId]) REFERENCES [dbo].[Issue] ([Id])
);
