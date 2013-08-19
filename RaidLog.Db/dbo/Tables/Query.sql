CREATE TABLE [dbo].[Query] (
    [Id]                   INT             IDENTITY (1, 1) NOT NULL,
    [Version]              ROWVERSION      NOT NULL,
    [ProjectId]            INT             NOT NULL,
    [QueryNumber]          INT             NOT NULL,
    [Workstream]           NVARCHAR (50)   NOT NULL,
    [DeliverableImpacted]  NVARCHAR (50)   NOT NULL,
    [Urgency]              NVARCHAR (10)   NOT NULL,
    [Description]          NVARCHAR (1024) NOT NULL,
    [RaisedBy]             NVARCHAR (50)   NOT NULL,
    [RaisedTo]             NVARCHAR (50)   NOT NULL,
    [RaisedDate]           DATE            NOT NULL,
    [Answer]               NVARCHAR (1024) NULL,
    [AnsweredBy]           NVARCHAR (50)   NULL,
    [AnsweredDate]         DATE            NULL,
    [ConfirmedInDocuments] NVARCHAR (256)  NULL,
    [UpdatedBy]            NVARCHAR (50)   NOT NULL,
    [UpdatedTimestamp]     DATETIME2 (7)   NOT NULL,
    CONSTRAINT [PK_Query] PRIMARY KEY CLUSTERED ([Id] ASC)
);

