CREATE TABLE [dbo].[Dependency](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ProjectId] [int] NOT NULL,
	[DependencyNumber] [int] NOT NULL,
	[Status] [nvarchar](10) NOT NULL,
	[Workstream] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](2048) NOT NULL,
	[PlannedDate] [date] NOT NULL,
	[RequiredByDate] [date] NOT NULL,
	[Comments] [nvarchar](2048) NOT NULL,
	[RAG] [nchar](1) NOT NULL,
	[DependencyLevel] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Dependency] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[Dependency]  WITH CHECK ADD  CONSTRAINT [FK_Dependency_Project] FOREIGN KEY([ProjectId])
REFERENCES [dbo].[Project] ([Id])
GO

ALTER TABLE [dbo].[Dependency] CHECK CONSTRAINT [FK_Dependency_Project]
GO
