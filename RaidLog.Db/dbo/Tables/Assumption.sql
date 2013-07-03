USE [RaidLog_dev]
GO

/****** Object:  Table [dbo].[Assumption]    Script Date: 30/06/2013 21:59:02 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Assumption](
	[Id] [int] IDENTITY(1,1) NOT NULL,
    [Version] [Timestamp] NOT NULL,
	[ProjectId] [int] NOT NULL,
	[AssumptionNumber] [int] NOT NULL,
	[Description] [nvarchar](2048) NOT NULL,
	[Workstream] [nvarchar](50) NOT NULL,
	[Owner] [nvarchar](50) NULL,
	[ValidatedBy] [nvarchar](50) NULL,
	[FollowOnAction] [nvarchar](1024) NULL,
	[SupportingDocumentation] [nvarchar](512) NULL,
 [UpdatedBy] NVARCHAR(50) NOT NULL, 
    [UpdatedTimestamp] DATETIME2 NOT NULL, 
    [AssumptionStatusId] INT NOT NULL, 
    CONSTRAINT [PK_Assumptions] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY], 
    CONSTRAINT [FK_Assumption_To_AssumptionStatus] FOREIGN KEY ([AssumptionStatusId]) REFERENCES [AssumptionStatus]([Id])
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[Assumption]  WITH CHECK ADD  CONSTRAINT [FK_Assumptions_Project] FOREIGN KEY([ProjectId])
REFERENCES [dbo].[Project] ([Id])
GO

ALTER TABLE [dbo].[Assumption] CHECK CONSTRAINT [FK_Assumptions_Project]
GO

USE [RaidLog_dev]
GO

/****** Object:  Index [UX_Assumption]    Script Date: 30/06/2013 22:00:16 ******/
CREATE UNIQUE NONCLUSTERED INDEX [UX_Assumption] ON [dbo].[Assumption]
(
	[ProjectId] ASC,
	[AssumptionNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO

