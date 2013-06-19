CREATE TABLE [dbo].[Risk] (
    [Id]           INT             IDENTITY (1, 1) NOT NULL,
    [ProjectId]        INT             NOT NULL,
    [RiskNumber]       INT             NOT NULL,
    [Description]      NVARCHAR (2048) NOT NULL,
    [RaisedDate]       DATE            NOT NULL,
    [RaisedBy]         NVARCHAR (50)   NOT NULL,
    [RifCategoryId]    INT             NOT NULL,
    [IsProjectRisk]    BIT             NOT NULL,
    [Workstream]       NVARCHAR (50)   NOT NULL,
    [ImpactCommentary] NVARCHAR (2048) NULL,
    [ApproachId]       INT             NULL,
    [Version]    TIMESTAMP             NOT NULL,
    [UpdatedTimestamp] DATETIME2 (7)   NOT NULL,
    [UpdatedBy]        NVARCHAR (50)   NOT NULL,
    CONSTRAINT [PK_Risk] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Risk_Approach] FOREIGN KEY ([ApproachId]) REFERENCES [dbo].[Approach] ([Id]),
    CONSTRAINT [FK_Risk_Project] FOREIGN KEY ([ProjectId]) REFERENCES [dbo].[Project] ([Id]),
    CONSTRAINT [FK_Risk_RifCategory] FOREIGN KEY ([RifCategoryId]) REFERENCES [dbo].[RifCategory] ([Id])
);


GO
CREATE UNIQUE NONCLUSTERED INDEX [UX_Risk_Project_Number]
    ON [dbo].[Risk]([ProjectId] ASC, [RiskNumber] ASC);

