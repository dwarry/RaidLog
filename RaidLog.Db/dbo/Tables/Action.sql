CREATE TABLE [dbo].[Action](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ActionNumber] [int] NOT NULL,
	[Description] [nvarchar](256) NOT NULL,
	[Actor] [nvarchar](50) NOT NULL,
	[IsComplete] [bit] NOT NULL,
	[Resolution] [nvarchar](256) NULL,
	[Version] [timestamp] NOT NULL,
	[UpdatedBy] [nvarchar](50) NOT NULL,
	[UpdatedTimestamp] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Action] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
))
