CREATE TABLE [dbo].[Project] (
    [Id]            INT           IDENTITY (1, 1) NOT NULL,
    [Code]                 NVARCHAR (16) NOT NULL,
    [Name]                 NVARCHAR (50) NOT NULL,
    [NextRiskNumber]       INT           NOT NULL,
    [NextAssumptionNumber] INT           NOT NULL,
    [NextIssueNumber]      INT           NOT NULL,
    [NextDependencyNumber] INT           NOT NULL,
    [VersionNumber]        INT           NOT NULL,
    [UpdatedTimestamp]     DATETIME2 (7) NOT NULL,
    [UpdatedBy]            NVARCHAR (50) NOT NULL,
    [IsActive] BIT NOT NULL DEFAULT 1, 
    CONSTRAINT [PK_Project] PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
CREATE NONCLUSTERED INDEX [UX_Project_Code]
    ON [dbo].[Project]([Code] ASC);

