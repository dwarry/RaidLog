CREATE TABLE [dbo].[Issue] (
    [Id]               INT             IDENTITY (1, 1) NOT NULL,
    [ProjectId]        INT             NOT NULL,
    [IssueNumber]      INT             NOT NULL,
    [RaisedDate]       DATE            NOT NULL,
    [RaisedBy]         NVARCHAR (50)   NOT NULL,
    [Owner]            NVARCHAR (50)   NULL,
    [Workstream]       NVARCHAR (50)   NULL,
    [Description]      NVARCHAR (2048) NULL,
    [ImpactCommentary] NVARCHAR (2048) NULL,
    CONSTRAINT [PK_Issue] PRIMARY KEY CLUSTERED ([Id] ASC)
);


