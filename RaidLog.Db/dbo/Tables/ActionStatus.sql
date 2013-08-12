CREATE TABLE [dbo].[ActionStatus] (
    [Id]           INT           NOT NULL,
    [Description]  NVARCHAR (50) NOT NULL,
    [IsFinalState] BIT           NOT NULL,
    CONSTRAINT [PK_ActionStatus] PRIMARY KEY CLUSTERED ([Id] ASC)
);

