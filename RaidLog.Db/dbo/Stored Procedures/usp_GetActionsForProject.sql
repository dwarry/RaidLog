-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[usp_GetActionsForProject]
	@projectId int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
    SET XACT_ABORT ON;

    SELECT  a.Id, 
            a.ActionNumber, 
            a.Description, 
            a.Actor, 
            a.ActionStatusId, 
            a.DueDate, 
            a.ResolvedDate, 
            a.Resolution, 
            a.Version, 
            a.UpdatedBy, 
            a.UpdatedTimestamp, 
            'Risk' as ParentItemType,
            ra.RiskId as ParentItemId,
            r.RiskNumber as ParentItemNumber
FROM        Action a
INNER JOIN
            Risk_Action ra 
ON          a.Id = ra.ActionId 
INNER JOIN
            Risk r ON ra.RiskId = r.Id 
INNER JOIN
            Project p1 ON r.ProjectId = p1.Id
WHERE        (p1.Id = @projectId)
UNION ALL
    SELECT  a.Id, 
            a.ActionNumber, 
            a.Description, 
            a.Actor, 
            a.ActionStatusId, 
            a.DueDate, 
            a.ResolvedDate, 
            a.Resolution, 
            a.Version, 
            a.UpdatedBy, 
            a.UpdatedTimestamp, 
            'Assumption' as ParentItemType,
            aa.AssumptionId as ParentItemId,
            a.ActionNumber as ParentItemNumber
FROM        Action a
INNER JOIN
            Assumption_Action aa 
ON          a.Id = aa.ActionId 
INNER JOIN
            Assumption ass ON aa.AssumptionId = ass.Id 
INNER JOIN
            Project p2 ON ass.ProjectId = p2.Id
WHERE       (p2.Id = @projectId)
UNION ALL
    SELECT  a.Id, 
            a.ActionNumber, 
            a.Description, 
            a.Actor, 
            a.ActionStatusId, 
            a.DueDate, 
            a.ResolvedDate, 
            a.Resolution, 
            a.Version, 
            a.UpdatedBy, 
            a.UpdatedTimestamp, 
            'Issue' as ParentItemType,
            ia.IssueId as ParentItemId,
            i.IssueNumber as ParentItemNumber
FROM        Action a
INNER JOIN
            Issue_Action ia 
ON          a.Id = ia.ActionId 
INNER JOIN
            Issue i ON ia.IssueId = i.Id 
INNER JOIN
            Project p3 ON i.ProjectId = p3.Id
WHERE        (p3.Id = @projectId)
UNION ALL
    SELECT  a.Id, 
            a.ActionNumber, 
            a.Description, 
            a.Actor, 
            a.ActionStatusId, 
            a.DueDate, 
            a.ResolvedDate, 
            a.Resolution, 
            a.Version, 
            a.UpdatedBy, 
            a.UpdatedTimestamp, 
            'Dependency' as ParentItemType,
            da.DependencyId as ParentItemId,
            d.DependencyNumber as ParentItemNumber
FROM        Action a
INNER JOIN
            Dependency_Action da 
ON          a.Id = da.ActionId 
INNER JOIN
            Dependency d ON da.DependencyId = d.Id 
INNER JOIN
            Project p4 ON d.ProjectId = p4.Id
WHERE        (p4.Id = @projectId)


END