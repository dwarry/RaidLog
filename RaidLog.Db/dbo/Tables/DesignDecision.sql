CREATE TABLE [dbo].[DesignDecision] (
    [Id]                   INT             IDENTITY (1, 1) NOT NULL,
    [Version]              ROWVERSION      NOT NULL,
    [ProjectId]            INT             NOT NULL,
    [DesignDecisionNumber] INT             NOT NULL,
    [Workstream]           NVARCHAR (50)   NOT NULL,
    [Description]          NVARCHAR (1024) NOT NULL,
    [OptionsSummary]       NVARCHAR (2048) NOT NULL,
    [Urgency]              NVARCHAR (10)   NOT NULL,
    [RequiredByDate]       DATE            NOT NULL,
    [RaisedBy]             NVARCHAR (50)   NOT NULL,
    [RaisedTo]             NVARCHAR (50)   NOT NULL,
    [RaisedDate]           DATE            NOT NULL,
    [Answer]               NVARCHAR (1024) NULL,
    [AnsweredBy]           NVARCHAR (50)   NULL,
    [AnsweredDate]         DATE            NULL,
    [ConfirmedInDocuments] NVARCHAR (256)  NULL,
    [UpdatedBy]            NVARCHAR (50)   NOT NULL,
    [UpdatedTimestamp]     DATETIME2 (7)   NOT NULL,
    CONSTRAINT [PK_DesignDecision] PRIMARY KEY CLUSTERED ([Id] ASC)
);

