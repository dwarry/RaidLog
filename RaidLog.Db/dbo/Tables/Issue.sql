CREATE TABLE [dbo].[Issue] (
    [Id]                    INT             IDENTITY (1, 1) NOT NULL,
    [Version]               ROWVERSION      NOT NULL,
    [ProjectId]             INT             NOT NULL,
    [IssueNumber]           INT             NOT NULL,
    [RaisedDate]            DATE            NOT NULL,
    [RaisedBy]              NVARCHAR (50)   NOT NULL,
    [Owner]                 NVARCHAR (50)   NULL,
    [Workstream]            NVARCHAR (50)   NULL,
    [Description]           NVARCHAR (2048) NULL,
    [Commentary]            NVARCHAR (2048) NULL,
    [ParentRiskId]          INT             NULL,
    [ResolvedDate]          DATE            NULL,
    [ResolvedBy]            NVARCHAR (50)   NULL,
    [ResolutionDescription] NVARCHAR (512)  NULL,
    [UpdatedBy]             NVARCHAR (50)   NOT NULL,
    [UpdatedTimestamp]      DATETIME2 (7)   NOT NULL,
    CONSTRAINT [PK_Issue] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Issue_Risk] FOREIGN KEY ([ParentRiskId]) REFERENCES [dbo].[Risk] ([Id]) ON DELETE SET NULL
);










