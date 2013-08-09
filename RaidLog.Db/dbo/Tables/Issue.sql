CREATE TABLE [dbo].[Issue] (
    [Id]                     INT             IDENTITY (1, 1) NOT NULL,
    [Version]                ROWVERSION      NOT NULL,
    [ProjectId]              INT             NOT NULL,
    [IssueNumber]            INT             NOT NULL,
    [RaisedDate]             DATE            NOT NULL,
    [RaisedBy]               NVARCHAR (50)   NOT NULL,
    [Owner]                  NVARCHAR (50)   NULL,
    [Workstream]             NVARCHAR (50)   NULL,
    [Description]            NVARCHAR (2048) NULL,
    [Commentary]             NVARCHAR (2048) NULL,
    [ParentRiskId]           INT             NULL,
    [ResolvedDate]           DATE            NULL,
    [ResolvedBy]             NVARCHAR (50)   NULL,
    [ResolutionDescription]  NVARCHAR (512)  NULL,
    [UpdatedBy]              NVARCHAR (50)   NOT NULL,
    [UpdatedTimestamp]       DATETIME2 (7)   NOT NULL,
    [RagStatus]              NVARCHAR (5)    CONSTRAINT [DF_Issue_RagStatus] DEFAULT ('Amber') NOT NULL,
    [PreviousRagStatus]      NVARCHAR (5)    CONSTRAINT [DF_Issue_PreviousRagStatus] DEFAULT ('Amber') NOT NULL,
    [DateLastReviewed]       DATE            NULL,
    [ExpectedClosureDate]    DATE            NULL,
    [IsEscalatedToProgramme] BIT             CONSTRAINT [DF_Issue_IsEscalatedToProgramme] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_Issue] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [CK_PreviousRag] CHECK ([PreviousRagStatus]='Green' OR [PreviousRagStatus]='Amber' OR [PreviousRagStatus]='Red'),
    CONSTRAINT [CK_Rag] CHECK ([RagStatus]='Green' OR [RagStatus]='Amber' OR [RagStatus]='Red'),
    CONSTRAINT [FK_Issue_Risk] FOREIGN KEY ([ParentRiskId]) REFERENCES [dbo].[Risk] ([Id]) ON DELETE SET NULL
);














