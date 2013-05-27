<?Infragistics.Models format="xaml" version="2"?>
<Flow xmlns="http://prototypes.infragistics.com/flows"
                                                         xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <Flow.Items>
        <Step x:Uid="$1" Title="user wants to register a new project" ContentScene="80" ContentSceneHotSpotWidth="271" ContentSceneHotSpotHeight="152" X="100" Y="100" Width="430" Height="322" />
        <Step x:Uid="$2" ContentView="/Project List.screen" ContentState="94a50c14-6b64-401c-82be-03e656376803" X="580" Y="100" Width="430" Height="322" />
        <Connector Source="{Reference $1}" Target="{Reference $2}" />
    </Flow.Items>
</Flow>
