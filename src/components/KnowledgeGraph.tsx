import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useTheme } from '../context/ThemeContext';

interface Node {
  id: string;
  label: string;
  category: string;
}

interface Link {
  source: string;
  target: string;
  strength: number;
}

interface KnowledgeGraphProps {
  nodes: Node[];
  links: Link[];
}

const KnowledgeGraph: React.FC<KnowledgeGraphProps> = ({ nodes, links }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const { darkMode } = useTheme();
  
  // Get colors for categories
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Technology: darkMode ? '#60A5FA' : '#3B82F6', // blue
      Science: darkMode ? '#34D399' : '#10B981', // green
      Philosophy: darkMode ? '#A78BFA' : '#8B5CF6', // purple
      History: darkMode ? '#FBBF24' : '#F59E0B', // amber
      Art: darkMode ? '#F472B6' : '#EC4899', // pink
    };
    
    return colors[category] || (darkMode ? '#9CA3AF' : '#6B7280'); // gray as default
  };
  
  useEffect(() => {
    if (!svgRef.current || !nodes.length || !links.length) return;
    
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    
    // Clear previous graph
    d3.select(svgRef.current).selectAll('*').remove();
    
    // Create the simulation with forces
    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id((d: any) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(30));
    
    // Prepare the data for D3
    const nodeData = nodes.map(node => ({ ...node }));
    const linkData = links.map(link => ({
      ...link,
      source: link.source,
      target: link.target
    }));
    
    // Create SVG elements
    const svg = d3.select(svgRef.current);
    
    // Add links
    const link = svg.append('g')
      .selectAll('line')
      .data(linkData)
      .enter()
      .append('line')
      .attr('class', 'connection-line')
      .attr('stroke-opacity', d => 0.3 + (d.strength * 0.7)); // Stronger connections are more visible
    
    // Add nodes
    const node = svg.append('g')
      .selectAll('g')
      .data(nodeData)
      .enter()
      .append('g')
      .call(d3.drag<SVGGElement, any>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));
    
    // Add circles to nodes
    node.append('circle')
      .attr('class', 'node-circle')
      .attr('r', 8)
      .attr('fill', d => getCategoryColor(d.category))
      .attr('stroke', darkMode ? '#1F2937' : '#F3F4F6')
      .attr('stroke-width', 2);
    
    // Add labels to nodes
    node.append('text')
      .attr('dx', 12)
      .attr('dy', '.35em')
      .text(d => d.label)
      .attr('font-size', '10px')
      .attr('fill', darkMode ? '#D1D5DB' : '#4B5563');
    
    // Handle simulation ticks
    simulation
      .nodes(nodeData)
      .on('tick', () => {
        link
          .attr('x1', d => Math.max(10, Math.min(width - 10, d.source.x)))
          .attr('y1', d => Math.max(10, Math.min(height - 10, d.source.y)))
          .attr('x2', d => Math.max(10, Math.min(width - 10, d.target.x)))
          .attr('y2', d => Math.max(10, Math.min(height - 10, d.target.y)));
        
        node.attr('transform', d => {
          const x = Math.max(10, Math.min(width - 10, d.x));
          const y = Math.max(10, Math.min(height - 10, d.y));
          return `translate(${x}, ${y})`;
        });
      });
    
    // @ts-ignore - typing is complex for D3 forces
    simulation.force('link').links(linkData);
    
    // Define drag functions
    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }
    
    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }
    
    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }
    
    // Add zoom capabilities
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 3])
      .on('zoom', (event) => {
        svg.selectAll('g').attr('transform', event.transform.toString());
      });
    
    svg.call(zoom);
    
    return () => {
      simulation.stop();
    };
  }, [nodes, links, darkMode]);
  
  return (
    <div className="graph-container">
      <svg ref={svgRef} width="100%" height="100%"></svg>
    </div>
  );
};

export default KnowledgeGraph;