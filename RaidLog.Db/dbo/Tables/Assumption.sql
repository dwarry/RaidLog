/****** Object:  Table [dbo].[Assumption]    Script Date: 30/06/2013 21:59:02 ******/
CREATE TABLE [dbo].[Assumption] (
    [Id]                      INT             IDENTITY (1, 1) NOT NULL,
    [Version]                 ROWVERSION      NOT NULL,
    [ProjectId]               INT             NOT NULL,
    [AssumptionNumber]        INT             NOT NULL,
    [Description]             NVARCHAR (2048) NOT NULL,
    [Workstream]              NVARCHAR (50)   NOT NULL,
    [Owner]                   NVARCHAR (50)   NULL,
    [ValidatedBy]             NVARCHAR (50)   NULL,
    [SupportingDocumentation] NVARCHAR (512)  NULL,
    [UpdatedBy]               NVARCHAR (50)   NOT NULL,
    [UpdatedTimestamp]        DATETIME2 (7)   NOT NULL,
    [AssumptionStatusId]      INT             CONSTRAINT [DF_Assumption_AssumptionStatusId] DEFAULT ((1)) NOT NULL,
    CONSTRAINT [PK_Assumptions] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Assumption_AssumptionStatus] FOREIGN KEY ([AssumptionStatusId]) REFERENCES [dbo].[AssumptionStatus] ([Id]),
    CONSTRAINT [FK_Assumptions_Project] FOREIGN KEY ([ProjectId]) REFERENCES [dbo].[Project] ([Id])
);

 

GO


GO


GO
/****** Object:  Index [UX_Assumption]    Script Date: 30/06/2013 22:00:16 ******/
CREATE UNIQUE NONCLUSTERED INDEX [UX_Assumption] ON [dbo].[Assumption]
(
	[ProjectId] ASC,
	[AssumptionNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO

