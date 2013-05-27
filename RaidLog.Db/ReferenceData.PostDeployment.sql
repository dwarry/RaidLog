/*
Post-Deployment Script Template							
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be appended to the build script.		
 Use SQLCMD syntax to include a file in the post-deployment script.			
 Example:      :r .\myfile.sql								
 Use SQLCMD syntax to reference a variable in the post-deployment script.		
 Example:      :setvar TableName MyTable							
               SELECT * FROM [$(TableName)]					
--------------------------------------------------------------------------------------
*/
GO
/****** Object:  Table [dbo].[RifCategory]    Script Date: 05/15/2013 21:27:09 ******/
SET IDENTITY_INSERT [dbo].[RifCategory] ON
INSERT [dbo].[RifCategory] ([Id], [Description]) VALUES (1, N'Business Case')
INSERT [dbo].[RifCategory] ([Id], [Description]) VALUES (2, N'Objectives & Scope')
INSERT [dbo].[RifCategory] ([Id], [Description]) VALUES (3, N'Information Technology')
INSERT [dbo].[RifCategory] ([Id], [Description]) VALUES (4, N'Stakeholders')
INSERT [dbo].[RifCategory] ([Id], [Description]) VALUES (5, N'Resources')
INSERT [dbo].[RifCategory] ([Id], [Description]) VALUES (6, N'Supplier Management')
INSERT [dbo].[RifCategory] ([Id], [Description]) VALUES (7, N'Plan')
INSERT [dbo].[RifCategory] ([Id], [Description]) VALUES (8, N'Reputation')
INSERT [dbo].[RifCategory] ([Id], [Description]) VALUES (9, N'BAU Operations')
SET IDENTITY_INSERT [dbo].[RifCategory] OFF

/****** Object:  Table [dbo].[Likelihood]    Script Date: 05/15/2013 21:27:09 ******/
SET IDENTITY_INSERT [dbo].[Likelihood] ON
INSERT [dbo].[Likelihood] ([Id], [Description], [Score]) VALUES (1, N'<3%', 1)
INSERT [dbo].[Likelihood] ([Id], [Description], [Score]) VALUES (2, N'3% - 15%', 2)
INSERT [dbo].[Likelihood] ([Id], [Description], [Score]) VALUES (3, N'15% - 40%', 3)
INSERT [dbo].[Likelihood] ([Id], [Description], [Score]) VALUES (4, N'40% - 90%', 4)
INSERT [dbo].[Likelihood] ([Id], [Description], [Score]) VALUES (5, N'> 90%', 5)
SET IDENTITY_INSERT [dbo].[Likelihood] OFF

/****** Object:  Table [dbo].[Impact]    Script Date: 05/15/2013 21:27:09 ******/
SET IDENTITY_INSERT [dbo].[Impact] ON
INSERT [dbo].[Impact] ([Id], [Description], [Score], [BudgetImpact], [TimeOverrunImpact], [ReputationalImpact], [BusinessImpact]) VALUES (1, N'Low', 1, N'<10%', N'< 1 month', N'Internal impact on Divisional / Directorate', N'No impact on project deliverables/plan')
INSERT [dbo].[Impact] ([Id], [Description], [Score], [BudgetImpact], [TimeOverrunImpact], [ReputationalImpact], [BusinessImpact]) VALUES (2, N'Low-Medium', 2, N'Between Low and Medium', N'ca. 1 month', N'Instance(s) of criticism / negative reaction from a small number of external parties', N'Some impact on deliverables/plan, but can be accomodated within the contingency provided')
INSERT [dbo].[Impact] ([Id], [Description], [Score], [BudgetImpact], [TimeOverrunImpact], [ReputationalImpact], [BusinessImpact]) VALUES (3, N'Medium', 3, N'>10% and/or >£250k', N'> 1 month', N'Widespread criticism / negative reaction from external parties', N'Some impact on deliverables requiring re-evaluation by PM')
INSERT [dbo].[Impact] ([Id], [Description], [Score], [BudgetImpact], [TimeOverrunImpact], [ReputationalImpact], [BusinessImpact]) VALUES (4, N'Medium-High', 4, N'Between Medium and High', N'ca. 2 months', N'Instances of critical response from national media coverage and/or public scrutiny', N'Some impact on critical path activities; requires evaluation of options by PM & briefing to Project Board')
INSERT [dbo].[Impact] ([Id], [Description], [Score], [BudgetImpact], [TimeOverrunImpact], [ReputationalImpact], [BusinessImpact]) VALUES (5, N'High', 5, N'>25%', N'> 3 months', N'Prolonged critical response from national media coverage or public scrutiny', N'Severe impact on critical path activities; requires escalation to Project Board / replanning')
SET IDENTITY_INSERT [dbo].[Impact] OFF

/****** Object:  Table [dbo].[Approach]    Script Date: 05/15/2013 21:27:09 ******/
SET IDENTITY_INSERT [dbo].[Approach] ON
INSERT [dbo].[Approach] ([Id], [Description]) VALUES (1, N'Retain')
INSERT [dbo].[Approach] ([Id], [Description]) VALUES (2, N'Mitigate')
INSERT [dbo].[Approach] ([Id], [Description]) VALUES (3, N'Insure')
SET IDENTITY_INSERT [dbo].[Approach] OFF
