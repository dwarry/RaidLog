CREATE TABLE [dbo].[Issue](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ProjectId] [int] NOT NULL,
	[IssueNumber] [int] NOT NULL,
	[RaisedDate] [date] NOT NULL,
	[RaisedBy] [nvarchar](50) NOT NULL,
	[Owner] [nvarchar](50) NULL,
	[Workstream] [nvarchar](50) NULL,
	[Description] [nvarchar](2048) NULL,
	[ImpactCommentary] [nvarchar](2048) NULL,
 CONSTRAINT [PK_Issue] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY], 
    CONSTRAINT [FK_Issue_To_Project] FOREIGN KEY ([ProjectId]) REFERENCES [dbo].[Project]([Id])
)