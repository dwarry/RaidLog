CREATE TABLE [dbo].[Project] (
    [Id]                   INT           IDENTITY (1, 1) NOT NULL,
    [Code]                 NVARCHAR (16) NOT NULL,
    [Name]                 NVARCHAR (50) NOT NULL,
    [NextRiskNumber]       INT           CONSTRAINT [DF_Project_NextRiskNumber] DEFAULT ((1)) NOT NULL,
    [NextAssumptionNumber] INT           CONSTRAINT [DF_Project_NextAssumptionNumber] DEFAULT ((1)) NOT NULL,
    [NextIssueNumber]      INT           CONSTRAINT [DF_Project_NextIssueNumber] DEFAULT ((1)) NOT NULL,
    [NextDependencyNumber] INT           CONSTRAINT [DF_Project_NextDependencyNumber] DEFAULT ((1)) NOT NULL,
    [NextQueryNumber]      INT           CONSTRAINT [DF_Project_NextQueryNumber] DEFAULT ((1)) NOT NULL,
    [Version]              ROWVERSION    NOT NULL,
    [UpdatedTimestamp]     DATETIME2 (7) NOT NULL,
    [UpdatedBy]            NVARCHAR (50) NOT NULL,
    [IsActive]             BIT           CONSTRAINT [DF__Project__IsActiv__239E4DCF] DEFAULT ((1)) NOT NULL,
    CONSTRAINT [PK_Project] PRIMARY KEY CLUSTERED ([Id] ASC)
);




GO
CREATE NONCLUSTERED INDEX [UX_Project_Code]
    ON [dbo].[Project]([Code] ASC);

