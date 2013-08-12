CREATE TABLE [dbo].[Action] (
    [Id]               INT            IDENTITY (1, 1) NOT NULL,
    [ActionNumber]     INT            NOT NULL,
    [Description]      NVARCHAR (256) NOT NULL,
    [Actor]            NVARCHAR (50)  NOT NULL,
    [ActionStatusId]   INT            NOT NULL,
    [DueDate]          DATE           NULL,
    [ResolvedDate]     DATE           NULL,
    [Resolution]       NVARCHAR (256) NULL,
    [Version]          ROWVERSION     NOT NULL,
    [UpdatedBy]        NVARCHAR (50)  NOT NULL,
    [UpdatedTimestamp] DATETIME2 (7)  NOT NULL,
    CONSTRAINT [PK_Action] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Action_ActionStatus] FOREIGN KEY ([ActionStatusId]) REFERENCES [dbo].[ActionStatus] ([Id])
);


